import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import { SIGN_UP_RECAPTCHA_ACTION } from '../universal/api-interfaces';
import './google';

// https://console.cloud.google.com/security/recaptcha/6LcCAUQpAAAAACT0JA2pRyJpMbPzDf3nEqcUQLOd/integration?project=ozy-app-352419
export async function validateCaptcha(token: string): Promise<boolean> {
    // Create the reCAPTCHA client.
    // TODO: Cache the client generation code (recommended) or call client.close() before exiting the method.
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(process.env.GOOGLE_CLOUD_PROJECT_ID!);

    // Build the assessment request.
    const request = ({
        assessment: {
            event: {
                token,
                siteKey: process.env.RECAPTCHA_ID,
            },
        },
        parent: projectPath,
    });

    const [ response ] = await client.createAssessment(request);

    // Check if the token is valid.
    if (!response.tokenProperties?.valid) {
        console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`);
        return false;
    }

    // Check if the expected action was executed.
    // The `action` property is set by user client in the grecaptcha.enterprise.execute() method.
    if (response.tokenProperties.action === SIGN_UP_RECAPTCHA_ACTION) {
        // Get the risk score and the reason(s).
        // For more information on interpreting the assessment, see:
        // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
        const riskAnalysis = response.riskAnalysis;
        if (!riskAnalysis || !riskAnalysis.score){
            console.log('one is missing; riskAnalysis:', riskAnalysis, ', score:', riskAnalysis?.score);
            return false;
        }

        console.log(`The reCAPTCHA score is: ${response.riskAnalysis?.score}`);

        riskAnalysis.reasons?.forEach((reason, i) => {
            console.log(`reason ${(i + 1)}: ${reason}`);
        });

        const { score } = riskAnalysis;
        if (score < 0.7) {
            console.log(`Bot detected! Score of ${score}`);
            return false;
        }
        console.log("Recaptcha passed");
        return true;
    } else {
        console.log(`Invalid action ${response.tokenProperties.action}`);
        return false;
    }
}
