/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Serializer, struct, u64 } from '@metaplex-foundation/umi/serializers';

export type RewardConfig = { ataInitReward: bigint; autoClaimReward: bigint };

export type RewardConfigArgs = { ataInitReward: number | bigint; autoClaimReward: number | bigint };

export function getRewardConfigSerializer(): Serializer<RewardConfigArgs, RewardConfig> {
  return struct<RewardConfig>(
    [
      ['ataInitReward', u64()],
      ['autoClaimReward', u64()],
    ],
    { description: 'RewardConfig' }
  ) as Serializer<RewardConfigArgs, RewardConfig>;
}
