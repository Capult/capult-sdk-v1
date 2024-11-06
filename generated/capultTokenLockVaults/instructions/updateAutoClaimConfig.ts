/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { Serializer, bytes, mapSerializer, option, struct } from '@metaplex-foundation/umi/serializers';
import { ResolvedAccount, ResolvedAccountsWithIndices, getAccountMetasAndSigners } from '../shared';
import { AutoClaimSetupArgs, AutoClaimSetupArgsArgs, getAutoClaimSetupArgsSerializer } from '../types';

// Accounts.
export type UpdateAutoClaimConfigInstructionAccounts = {
  tokenLockVault: PublicKey | Pda;
  withdrawAuthority: Signer;
  payer?: Signer;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type UpdateAutoClaimConfigInstructionData = {
  discriminator: Uint8Array;
  newAutoClaimSetup: Option<AutoClaimSetupArgs>;
};

export type UpdateAutoClaimConfigInstructionDataArgs = { newAutoClaimSetup: OptionOrNullable<AutoClaimSetupArgsArgs> };

export function getUpdateAutoClaimConfigInstructionDataSerializer(): Serializer<
  UpdateAutoClaimConfigInstructionDataArgs,
  UpdateAutoClaimConfigInstructionData
> {
  return mapSerializer<UpdateAutoClaimConfigInstructionDataArgs, any, UpdateAutoClaimConfigInstructionData>(
    struct<UpdateAutoClaimConfigInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['newAutoClaimSetup', option(getAutoClaimSetupArgsSerializer())],
      ],
      { description: 'UpdateAutoClaimConfigInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([125, 152, 45, 187, 222, 169, 65, 81]) })
  ) as Serializer<UpdateAutoClaimConfigInstructionDataArgs, UpdateAutoClaimConfigInstructionData>;
}

// Args.
export type UpdateAutoClaimConfigInstructionArgs = UpdateAutoClaimConfigInstructionDataArgs;

// Instruction.
export function updateAutoClaimConfig(
  context: Pick<Context, 'payer' | 'programs'>,
  input: UpdateAutoClaimConfigInstructionAccounts & UpdateAutoClaimConfigInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'capultTokenLockVaults',
    'CPTLVeSKEXbPNZ4WnHTTGBX4J2uV3ktv3YkL9i7wSPwC'
  );

  // Accounts.
  const resolvedAccounts = {
    tokenLockVault: { index: 0, isWritable: true as boolean, value: input.tokenLockVault ?? null },
    withdrawAuthority: { index: 1, isWritable: true as boolean, value: input.withdrawAuthority ?? null },
    payer: { index: 2, isWritable: true as boolean, value: input.payer ?? null },
    systemProgram: { index: 3, isWritable: false as boolean, value: input.systemProgram ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: UpdateAutoClaimConfigInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, 'programId', programId);

  // Data.
  const data = getUpdateAutoClaimConfigInstructionDataSerializer().serialize(
    resolvedArgs as UpdateAutoClaimConfigInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
