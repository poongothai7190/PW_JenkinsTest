pipeline {
    agent any

    environment {
        // NODE_ENV = 'test'
        // REPORT_DIR = 'playwright-report'
        // ALLURE_DIR = 'allure-report'
        NODE_ENV = 'test'
        PLAYWRIGHT_REPORT = 'playwright-report.json'
        ALLURE_RESULTS = 'allure-results'
        ALLURE_REPORT = 'allure-report'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

         stage('Clean Old Reports') {
            steps {
                bat "rm -rf ${env.ALLURE_RESULTS} ${env.ALLURE_REPORT}"
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test --reporter=json'
            }
        }

        // stage('Extract Test Counts') {
        //     steps {
        //         script {
        //             // Read the JSON report
        //             def reportFile = "${env.WORKSPACE}/playwright-report.json"
        //             if (!fileExists(reportFile)) {
        //                 error "playwright-report.json not found!"
        //             }

        //             def jsonText = readFile(reportFile)
        //             def report = readJSON text: jsonText

        //             // Count passed, failed, skipped
        //             int passed = report.suites.collect { it.tests.count { t -> t.status == 'passed' } }.sum()
        //             int failed = report.suites.collect { it.tests.count { t -> t.status == 'failed' } }.sum()
        //             int skipped = report.suites.collect { it.tests.count { t -> t.status == 'skipped' } }.sum()

        //             // Save counts in environment variables
        //             env.PASSED = passed.toString()
        //             env.FAILED = failed.toString()
        //             env.SKIPPED = skipped.toString()
        //         }
        //     }
        // }

        stage('Generate Allure Report') {
            steps {
                bat "npx allure generate ${env.REPORT_DIR} --clean -o ${env.ALLURE_DIR}"
                allure([
                        includeProperties: false,
                        jdk: '', 
                        results: [[path: "${env.REPORT_DIR}"]],
                        reportBuildPolicy: 'ALWAYS'
                        ])
            }
        }

//         stage('Send Email') {
//             steps {
//                 mail bcc: '', 
//                      body: """Playwright test execution finished.
                     
// Passed: ${env.PASSED}
// Failed: ${env.FAILED}
// Skipped: ${env.SKIPPED}

// Check Allure report: ${env.BUILD_URL}artifact/${env.ALLURE_DIR}/index.html
// """,
//                      cc: '', 
//                      from: 'jenkins@company.com', 
//                      replyTo: 'jenkins@company.com', 
//                      subject: "Playwright Test Report - Build #${env.BUILD_NUMBER}", 
//                      to: 'team@company.com'
//             }
//         }
    }

    post {
        always {
            archiveArtifacts artifacts: "${env.ALLURE_DIR}/**", allowEmptyArchive: true
            // archiveArtifacts artifacts: 'playwright-report.json', allowEmptyArchive: true
        }
        // failure {
        //     mail to: 'team@company.com',
        //          subject: "Playwright Tests Failed - Build #${env.BUILD_NUMBER}",
        //          body: "Check Jenkins build ${env.BUILD_URL} for details."
        // }
    }
}