/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { PublicKey } from '@metaplex-foundation/umi';
import { Serializer, bool, publicKey as publicKeySerializer, struct } from '@metaplex-foundation/umi/serializers';

export type WhitelistTokenConfig = { collection: PublicKey; burnWhitelistToken: boolean };

export type WhitelistTokenConfigArgs = WhitelistTokenConfig;

export function getWhitelistTokenConfigSerializer(): Serializer<WhitelistTokenConfigArgs, WhitelistTokenConfig> {
  return struct<WhitelistTokenConfig>(
    [
      ['collection', publicKeySerializer()],
      ['burnWhitelistToken', bool()],
    ],
    { description: 'WhitelistTokenConfig' }
  ) as Serializer<WhitelistTokenConfigArgs, WhitelistTokenConfig>;
}
