import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { database } from '@cdktf/provider-google';
import { MongodbatlasProvider } from "@cdktf/provider-mongodbatlas/lib/provider";
import { Project } from "@cdktf/provider-mongodbatlas/lib/project";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new MongodbatlasProvider(this, "AtlasProvider", {
      publicKey: '',
      privateKey: ''
    });

    const project = new Project(this, 'ozy-app', {
      name: 'ozy-app',
      orgId: '6403bde30b7bf303e9f560c8'
    });


  }
}

const app = new App();
new MyStack(app, "infra");
app.synth();
