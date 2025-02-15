import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { cluster, database, provider, sqlUser } from './.gen/providers/cockroach';
import * as ozy from '@ozy/constants';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    /*
    const providerName = `${ozy.APP_NAME}-cockroach-provider`;
    new provider.CockroachProvider(this, providerName, {
      apikey: OZY_COCKROACH_DB_API_KEY
    });

    const clusterName = `${ozy.APP_NAME}-cockroach-cluster`;
    const clusterResource = new cluster.Cluster(this, clusterName, {
      name: clusterName,
      cloudProvider: 'GCP',
      regions: [
        {
          name: 'us-west2',
          primary: true
        }
      ],
      serverless: {}
    });

    new database.Database(this, ozy.DB_NAME, {
      name: ozy.DB_NAME,
      clusterId: clusterResource.id
    });

    new sqlUser.SqlUser(this, ozy.DB_USER_NAME, {
      name: ozy.DB_USER_NAME,
      clusterId: clusterResource.id,
    })

    // https://medium.com/google-cloud/terraform-cdk-gcp-5455c481f364
    // https://developer.hashicorp.com/terraform/tutorials/kubernetes/gke
    /*
    const gcpProvider = new provider.GoogleProvider(this, `${ozy.APP_NAME}-provider`, {
      project: 'ozy-app-352419',
      region: 'testing' // us-west2
    });

    console.log(`gcp provider is ${gcpProvider.project} in region ${gcpProvider.region} ${gcpProvider.zone}`);
    const dbInstanceName = `${ozy.DB_NAME}-instance`
    const dbInstance = new sqlDatabaseInstance.SqlDatabaseInstance(this, dbInstanceName, {
      project: gcpProvider.project,
      name: dbInstanceName,
      region: gcpProvider.region,
      databaseVersion: 'POSTGRES_15',
      settings: {
        tier: 'db-f1-micro', // https://cloud.google.com/sql/docs/postgres/pricing
        ipConfiguration: {
          ipv4Enabled: true
        }
      }
    });

    new sqlDatabase.SqlDatabase(this, ozy.DB_NAME, {
      name: ozy.DB_NAME,
      instance: dbInstance.name,
      project: gcpProvider.project
    });
    */

    // https://developer.hashicorp.com/terraform/tutorials/kubernetes/gke?utm_medium=WEB_IO&in=terraform%2Fkubernetes&utm_offer=ARTICLE_PAGE&utm_source=WEBSITE&utm_content=DOCS
    /*
    const gcpFormattedRegion = ozy.INFRA_REGION.toLocaleLowerCase() + '1';
    console.log('formatted region', gcpFormattedRegion);
    new GoogleProvider(this, `${ozy.APP_NAME}-google-provider`, {
      region: gcpFormattedRegion,
      zone: `${gcpFormattedRegion}-c`,
      project: ozy.APP_NAME
    });

    const clusterName = `${ozy.APP_NAME}-gke-cluster`;
    const cluster = new ContainerCluster(this, clusterName, {
      name: clusterName,
      location: gcpFormattedRegion,
      initialNodeCount: 1,
      removeDefaultNodePool: true,
      network: "default",
      defaultMaxPodsPerNode: 100,
      enableKubernetesAlpha: false,
      releaseChannel: {
        channel: "REGULAR"
      },
      autopilot: {
        enabled: true,
      }
    });

    new KubernetesProvider(this, 'K8s', {
      host: cluster.endpoint,
      token: cluster.masterAuth[0].accessToken,
      clusterCaCertificate: cluster.masterAuth[0].clusterCaCertificate
    });

    const postgresConfigMap = new ConfigMap(this, 'PostgresConfig', {
      metadata: {
        name: 'postgres-config'
      },
      data: {
        'POSTGRES_DB': 'my_database',
        'POSTGRES_USER': 'my_user',
        'POSTGRES_PASSWORD': 'my_password'
      }
    });

    const postgresDeployment = new Deployment(this, 'PostgresDeployment', {
      metadata: {
        name: 'postgres-deployment'
      },
      spec: {
        selector: {
          matchLabels: {
            app: 'postgres'
          }
        },
        template: {
          metadata: {
            labels: {
              app: 'postgres'
            }
          },
          spec: {
            containers: [
              {
                name: 'postgres',
                image: 'postgres:latest',  // Update with your image
                envFrom: [
                  {
                    configMapRef: {
                      name: postgresConfigMap.metadata[0].name
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    });

    const nodeAppDeployment = new Deployment(this, 'NodeAppDeployment', {
      metadata: {
        name: 'node-app-deployment'
      },
      spec: {
        selector: {
          matchLabels: {
            app: 'node-app'
          }
        },
        template: {
          metadata: {
            labels: {
              app: 'node-app'
            }
          },
          spec: {
            containers: [
              {
                name: 'node-app',
                image: 'node-app:latest'  // Update with your image
              }
            ]
          }
        }
      }
    });
    */
  }
}

const app = new App();
new MyStack(app, "infra");
app.synth();
