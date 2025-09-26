// lib/cloudinaryUsage.ts
import cloudinary from "./cloudinary";

export async function getCloudinaryUsageMB() {
  const usage = await cloudinary.api.usage();

  // Convert bytes to MB
  const storageUsedMB = usage.storage.usage / 1024 / 1024;
  const storageLimitMB = usage.credits.limit ? usage.credits.limit : null; // free plan limit in credits, not storage, optional
  const bandwidthUsedMB = usage.bandwidth.usage / 1024 / 1024;
  const transformationsUsed = usage.transformations.usage;

  return {
    plan: usage.plan,
    storageUsedMB: storageUsedMB.toFixed(2),
    bandwidthUsedMB: bandwidthUsedMB.toFixed(2),
    transformationsUsed,
    totalResources: usage.resources,
    derivedResources: usage.derived_resources,
    creditsUsed: usage.credits.usage,
    creditsLimit: usage.credits.limit,
    creditsUsedPercent: usage.credits.used_percent,
  };
}
