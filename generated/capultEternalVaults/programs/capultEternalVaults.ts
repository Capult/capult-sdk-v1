/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { ClusterFilter, Context, Program, PublicKey } from '@metaplex-foundation/umi';
import { getCapultEternalVaultsErrorFromCode, getCapultEternalVaultsErrorFromName } from '../errors';

export const CAPULT_ETERNAL_VAULTS_PROGRAM_ID =
  'CPEVjv7pvzLceHN9auJhniU2y3divtY4PUaTvLEoxpbP' as PublicKey<'CPEVjv7pvzLceHN9auJhniU2y3divtY4PUaTvLEoxpbP'>;

export function createCapultEternalVaultsProgram(): Program {
  return {
    name: 'capultEternalVaults',
    publicKey: CAPULT_ETERNAL_VAULTS_PROGRAM_ID,
    getErrorFromCode(code: number, cause?: Error) {
      return getCapultEternalVaultsErrorFromCode(code, this, cause);
    },
    getErrorFromName(name: string, cause?: Error) {
      return getCapultEternalVaultsErrorFromName(name, this, cause);
    },
    isOnCluster() {
      return true;
    },
  };
}

export function getCapultEternalVaultsProgram<T extends Program = Program>(
  context: Pick<Context, 'programs'>,
  clusterFilter?: ClusterFilter
): T {
  return context.programs.get<T>('capultEternalVaults', clusterFilter);
}

export function getCapultEternalVaultsProgramId(
  context: Pick<Context, 'programs'>,
  clusterFilter?: ClusterFilter
): PublicKey {
  return context.programs.getPublicKey('capultEternalVaults', CAPULT_ETERNAL_VAULTS_PROGRAM_ID, clusterFilter);
}
