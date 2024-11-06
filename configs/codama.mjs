import { createFromRoot } from 'codama';
import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import { renderJavaScriptUmiVisitor } from '@codama/renderers';
import { readFileSync } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Create absolute path and ensure directory exists
const OUTPUT_DIR = path.resolve(__dirname, '../clients/js/src/generated/');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Read IDL files
const readIdl = (filename) => JSON.parse(
  readFileSync(path.join(__dirname, '../idls', filename), 'utf-8')
);

// Load all IDLs
const capultTokensIdl = readIdl('capult_tokens.json');
const capultEternalVaultsIdl = readIdl('capult_eternal_vaults.json');
const capultTokenLockVaultsIdl = readIdl('capult_token_lock_vaults.json');
const capultTokenSalesIdl = readIdl('capult_token_sales.json');
const capultMetadataIdl = readIdl('capult_metadata.json');

// Process each IDL
const processIdl = (idl, programName) => {
  const codama = createFromRoot(rootNodeFromAnchor(idl));
  codama.accept(renderJavaScriptUmiVisitor(path.join(OUTPUT_DIR, programName), { formatCode: true, prettierOptions: { printWidth: 120 } }));
};

// Process all programs
processIdl(capultTokensIdl, 'capultTokens');
processIdl(capultEternalVaultsIdl, 'capultEternalVaults');
processIdl(capultTokenLockVaultsIdl, 'capultTokenLockVaults');
processIdl(capultTokenSalesIdl, 'capultTokenSales');
processIdl(capultMetadataIdl, 'capultMetadata'); 
