export const HIRE_DELIVERY_BRANCH = 'vpods/hire';
export const DEFAULT_INTEGRATION_BRANCH = 'main';

export type DeliveryRepository = {
  owner: string;
  repo: string;
  fullName: string;
};

export type HireBranchStatus = {
  deliveryBranch: typeof HIRE_DELIVERY_BRANCH;
  repository: string;
  integrationBranch: string;
  found: boolean;
  sha: string | null;
  htmlUrl: string | null;
  checkedAt: string;
};

export type HireBranchEnsureResult = HireBranchStatus & {
  created: boolean;
  message: string;
};

export class GitHubApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

function githubHeaders(token: string | undefined): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export function resolveDeliveryRepository(): DeliveryRepository {
  const fromEnv = process.env.GITHUB_REPOSITORY?.trim();
  if (fromEnv && fromEnv.includes('/')) {
    const [owner, repo] = fromEnv.split('/', 2);
    return { owner, repo, fullName: fromEnv };
  }

  const owner = process.env.DELIVERY_REPO_OWNER?.trim() ?? 'sidtal913';
  const repo = process.env.DELIVERY_REPO_NAME?.trim() ?? 'test-dummy';
  return { owner, repo, fullName: `${owner}/${repo}` };
}

function branchRefPath(branch: string): string {
  return `heads/${encodeURIComponent(branch)}`;
}

async function githubFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const token = process.env.GITHUB_TOKEN?.trim();
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      ...githubHeaders(token),
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (response.status === 404) {
    throw new GitHubApiError('GitHub resource not found', 404);
  }

  if (!response.ok) {
    let details: unknown;
    try {
      details = await response.json();
    } catch {
      details = await response.text();
    }
    throw new GitHubApiError(
      `GitHub API request failed (${response.status})`,
      response.status,
      details,
    );
  }

  return (await response.json()) as T;
}

type GitRefResponse = {
  ref: string;
  object: { sha: string; type: string };
};

export async function getHireBranchStatus(
  repository: DeliveryRepository = resolveDeliveryRepository(),
  integrationBranch: string = DEFAULT_INTEGRATION_BRANCH,
): Promise<HireBranchStatus> {
  const checkedAt = new Date().toISOString();
  const base: HireBranchStatus = {
    deliveryBranch: HIRE_DELIVERY_BRANCH,
    repository: repository.fullName,
    integrationBranch,
    found: false,
    sha: null,
    htmlUrl: null,
    checkedAt,
  };

  try {
    const ref = await githubFetch<GitRefResponse>(
      `/repos/${repository.owner}/${repository.repo}/git/ref/${branchRefPath(HIRE_DELIVERY_BRANCH)}`,
    );
    return {
      ...base,
      found: true,
      sha: ref.object.sha,
      htmlUrl: `https://github.com/${repository.fullName}/tree/${encodeURIComponent(HIRE_DELIVERY_BRANCH)}`,
    };
  } catch (error) {
    if (error instanceof GitHubApiError && error.status === 404) {
      return base;
    }
    throw error;
  }
}

export async function ensureHireDeliveryBranch(
  repository: DeliveryRepository = resolveDeliveryRepository(),
  integrationBranch: string = DEFAULT_INTEGRATION_BRANCH,
): Promise<HireBranchEnsureResult> {
  const existing = await getHireBranchStatus(repository, integrationBranch);
  if (existing.found) {
    return {
      ...existing,
      created: false,
      message: `Branch "${HIRE_DELIVERY_BRANCH}" already exists on ${repository.fullName}.`,
    };
  }

  const token = process.env.GITHUB_TOKEN?.trim();
  if (!token) {
    throw new GitHubApiError(
      'GITHUB_TOKEN is required to create the hire delivery branch',
      503,
    );
  }

  const integrationRef = await githubFetch<GitRefResponse>(
    `/repos/${repository.owner}/${repository.repo}/git/ref/${branchRefPath(integrationBranch)}`,
  );

  try {
    await githubFetch<GitRefResponse>(
      `/repos/${repository.owner}/${repository.repo}/git/refs`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ref: `refs/heads/${HIRE_DELIVERY_BRANCH}`,
          sha: integrationRef.object.sha,
        }),
      },
    );
  } catch (error) {
    if (
      error instanceof GitHubApiError &&
      error.status === 422 &&
      typeof error.details === 'object' &&
      error.details !== null &&
      'message' in error.details &&
      String((error.details as { message?: string }).message).includes('Reference already exists')
    ) {
      const refreshed = await getHireBranchStatus(repository, integrationBranch);
      return {
        ...refreshed,
        created: false,
        message: `Branch "${HIRE_DELIVERY_BRANCH}" was created concurrently; using existing ref.`,
      };
    }
    throw error;
  }

  const created = await getHireBranchStatus(repository, integrationBranch);
  return {
    ...created,
    created: true,
    message: `Created branch "${HIRE_DELIVERY_BRANCH}" from ${integrationBranch} on ${repository.fullName}.`,
  };
}
