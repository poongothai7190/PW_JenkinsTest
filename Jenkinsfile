pipeline {
    agent any

    environment {
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

        stage('Install Playwright Browsers') {
        steps {
            bat 'npx playwright install'
        }
    }

         stage('Clean Old Reports') {
            steps {
                // Delete allure-results if it exists
                bat """
                    if exist allure-results rmdir /s /q allure-results
                    if exist allure-report rmdir /s /q allure-report
                """
            }
        }

      stage('Run Playwright Tests') {
        steps {
            script {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                // bat 'npx playwright test --reporter=allure-playwright --reporter=json=playwright-report.json'
                bat 'npx playwright test'
                }
                 // DEBUG HERE
                 bat 'dir'
            }
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

        // stage('Read Test Summary') {
        //     steps {
        //         script {
        //             def summaryFile = "${env.WORKSPACE}/summary.txt"
        //             if (!fileExists(summaryFile)) {
        //                 error "summary.txt not found! Make sure globalTeardown ran."
        //             }
        //             env.TEST_SUMMARY = readFile(summaryFile).trim()
        //             echo "Test Summary:\n${env.TEST_SUMMARY}"
        //         }
        //     }
        // }

         stage('Generate Allure Report') {
            steps {
                bat "npx allure generate ${env.ALLURE_RESULTS} --clean -o ${env.ALLURE_REPORT}"
                archiveArtifacts artifacts: "${env.ALLURE_REPORT}/**", allowEmptyArchive: true

            allure([
                reportBuildPolicy: 'ALWAYS',
                results: [[path: "${env.ALLURE_RESULTS}"]]
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

//     stage('Send Email') {
//     steps {
//         mail bcc: '',
//              body: """Playwright test execution finished.

// ${env.TEST_SUMMARY}

// Check Allure report: ${env.BUILD_URL}artifact/${env.ALLURE_REPORT}/index.html
// """,
//              cc: 'testautomationmail2025@gmail.com',
//              from: 'poongothai.ece@gmail.com',
//              replyTo: 'testautomationmail2025@gmail.com',
//              subject: "Playwright Test Report - Build #${env.BUILD_NUMBER}",
//              to: 'testautomationmail2025@gmail.com,worksheets.kothai@gmail.com'
//     }
// }

    // post {
    //     always {
    //         archiveArtifacts artifacts: "${env.ALLURE_DIR}/**", allowEmptyArchive: true
    //         // archiveArtifacts artifacts: 'playwright-report.json', allowEmptyArchive: true
    //     }
    //     // failure {
    //     //     mail to: 'team@company.com',
    //     //          subject: "Playwright Tests Failed - Build #${env.BUILD_NUMBER}",
    //     //          body: "Check Jenkins build ${env.BUILD_URL} for details."
    //     // }
    // }

    post {
    always {
        // Archive Allure report
        archiveArtifacts artifacts: "${env.ALLURE_REPORT}/**", allowEmptyArchive: true
        // Archive Playwright JSON report
        archiveArtifacts artifacts: "${env.PLAYWRIGHT_REPORT}", allowEmptyArchive: true
    }

    // success {
    //     echo "Build succeeded! Allure report generated."
    // }

    // failure {
    //     // Optional: send email on failure
    //     mail bcc: '',
    //          cc: 'manager1@company.com,manager2@company.com',
    //          from: 'poongothai.ece@gmail.com',
    //          replyTo: 'testautomationmail2025@gmail.com',
    //          subject: "Playwright Tests Failed - Build #${env.BUILD_NUMBER}",
    //          body: """Playwright test execution failed.

    //         Check Jenkins build: ${env.BUILD_URL}

    //         Check Allure report (if any): ${env.BUILD_URL}artifact/${env.ALLURE_REPORT}/index.html
    //         """,
    //          to: 'team1@company.com,team2@company.com'
    //     }
    }
}