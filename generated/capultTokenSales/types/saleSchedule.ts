/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Option, OptionOrNullable } from '@metaplex-foundation/umi';
import { Serializer, option, struct, u64 } from '@metaplex-foundation/umi/serializers';

export type SaleSchedule = { startSlot: Option<bigint>; endSlot: Option<bigint> };

export type SaleScheduleArgs = {
  startSlot: OptionOrNullable<number | bigint>;
  endSlot: OptionOrNullable<number | bigint>;
};

export function getSaleScheduleSerializer(): Serializer<SaleScheduleArgs, SaleSchedule> {
  return struct<SaleSchedule>(
    [
      ['startSlot', option(u64())],
      ['endSlot', option(u64())],
    ],
    { description: 'SaleSchedule' }
  ) as Serializer<SaleScheduleArgs, SaleSchedule>;
}
