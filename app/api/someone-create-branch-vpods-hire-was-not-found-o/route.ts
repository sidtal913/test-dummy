import { NextResponse } from 'next/server';

import {
  DEFAULT_INTEGRATION_BRANCH,
  ensureHireDeliveryBranch,
  getHireBranchStatus,
  GitHubApiError,
  resolveDeliveryRepository,
} from '@/lib/github/delivery-branch';

export const dynamic = 'force-dynamic';

function errorResponse(error: unknown) {
  if (error instanceof GitHubApiError) {
    return NextResponse.json(
      {
        error: error.message,
        status: error.status,
        details: error.details ?? null,
      },
      { status: error.status >= 400 && error.status < 600 ? error.status : 502 },
    );
  }

  const message = error instanceof Error ? error.message : 'Unexpected server error';
  return NextResponse.json({ error: message }, { status: 500 });
}

/**
 * TAXI-19 — Report whether the shared hire integration branch exists on the delivery repo.
 */
export async function GET() {
  try {
    const repository = resolveDeliveryRepository();
    const status = await getHireBranchStatus(repository);
    return NextResponse.json(
      {
        ...status,
        ticket: 'TAXI-19',
        requires: ['TAXI-10'],
        hint: status.found
          ? null
          : `Branch "${status.deliveryBranch}" was not found on ${status.repository}. POST this endpoint to create it from ${DEFAULT_INTEGRATION_BRANCH} when GITHUB_TOKEN is configured.`,
      },
      { status: status.found ? 200 : 404 },
    );
  } catch (error) {
    return errorResponse(error);
  }
}

/**
 * TAXI-19 — Idempotently create `vpods/hire` on the delivery repository (requires GITHUB_TOKEN).
 */
export async function POST() {
  try {
    const repository = resolveDeliveryRepository();
    const result = await ensureHireDeliveryBranch(repository);
    return NextResponse.json(
      {
        ...result,
        ticket: 'TAXI-19',
        requires: ['TAXI-10'],
      },
      { status: result.created ? 201 : 200 },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
