import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import {  } from '@cdktf/provider-google';
import { MongodbatlasProvider } from "@cdktf/provider-mongodbatlas/lib/provider";
import { Project } from "@cdktf/provider-mongodbatlas/lib/project";
import { ServerlessInstance } from "@cdktf/provider-mongodbatlas/lib/serverless-instance";
import { DatabaseUser } from "@cdktf/provider-mongodbatlas/lib/database-user";

const APP_NAME = 'ozy-app';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new MongodbatlasProvider(this, "AtlasProvider", {
      publicKey: process.env.OZY_MONGODB_PUBKEY,
      privateKey: process.env.OZY_MONGODB_PRIVKEY
    });

    const project = new Project(this, APP_NAME, {
      name: APP_NAME,
      orgId: '6403bde30b7bf303e9f560c8',
    });

    // https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs/data-sources/serverless_instance
    const DB_NAME = `${APP_NAME}-db`;
    const db = new ServerlessInstance(this, DB_NAME, {
       name: DB_NAME,
       projectId: project.id,
       providerSettingsBackingProviderName: 'GCP',
       providerSettingsProviderName: 'SERVERLESS',
       providerSettingsRegionName: 'CENTRAL_US',
    });

    const USERNAME = `${DB_NAME}-user`;
    new DatabaseUser(this, USERNAME, {
      authDatabaseName: 'admin',
      projectId: project.id,
      username: USERNAME,
      // Only use below when creating user for first time
      // password,
      roles: [
        {
          databaseName: db.name,
          // https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Database-Users/operation/createDatabaseUser
          roleName: 'readWrite'
        }
      ]
    });
  }
}

const app = new App();
new MyStack(app, "infra");
app.synth();
