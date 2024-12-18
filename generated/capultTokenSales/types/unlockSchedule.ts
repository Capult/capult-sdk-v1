/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Option, OptionOrNullable, PublicKey } from '@metaplex-foundation/umi';
import {
  Serializer,
  i64,
  option,
  publicKey as publicKeySerializer,
  struct,
  u16,
} from '@metaplex-foundation/umi/serializers';

export type UnlockSchedule = {
  startDate: Option<bigint>;
  endDate: bigint;
  interval: Option<bigint>;
  cliffBasisPoints: Option<number>;
  royaltyConfig: Option<PublicKey>;
};

export type UnlockScheduleArgs = {
  startDate: OptionOrNullable<number | bigint>;
  endDate: number | bigint;
  interval: OptionOrNullable<number | bigint>;
  cliffBasisPoints: OptionOrNullable<number>;
  royaltyConfig: OptionOrNullable<PublicKey>;
};

export function getUnlockScheduleSerializer(): Serializer<UnlockScheduleArgs, UnlockSchedule> {
  return struct<UnlockSchedule>(
    [
      ['startDate', option(i64())],
      ['endDate', i64()],
      ['interval', option(i64())],
      ['cliffBasisPoints', option(u16())],
      ['royaltyConfig', option(publicKeySerializer())],
    ],
    { description: 'UnlockSchedule' }
  ) as Serializer<UnlockScheduleArgs, UnlockSchedule>;
}
