import { HasuraMetadataV2 } from '@hasura/metadata';

function getMetadata(): HasuraMetadataV2 {
    return {
        version: 2,
        tables: [],
    }
}