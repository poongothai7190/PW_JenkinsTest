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

     stage('Read Test Summary') {
        steps {
            script {
                def summaryFile = "${env.WORKSPACE}/summary.txt"
                if (!fileExists(summaryFile)) {
                    error "summary.txt not found! Make sure globalTeardown ran."
                }
                env.TEST_SUMMARY = readFile(summaryFile).trim()
                echo "Test Summary:\n${env.TEST_SUMMARY}"
            }
        }
    }

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


     post {
        always {
            // Archive Playwright JSON and Allure report
            archiveArtifacts artifacts: "${env.ALLURE_REPORT}/**", allowEmptyArchive: true
            archiveArtifacts artifacts: "${env.PLAYWRIGHT_REPORT}", allowEmptyArchive: true
        }

        // Send email for success or unstable builds
        success {
            script {
                emailext(
                    to: 'testautomationmail2025@gmail.com,worksheets.kothai@gmail.com',
                    cc: 'poongothai.ece@gmail.com',
                    subject: "Playwright Tests Passed - Build #${env.BUILD_NUMBER}",
                    body: """Playwright test execution passed.

${env.TEST_SUMMARY}

Check Allure report: ${env.BUILD_URL}artifact/${env.ALLURE_REPORT}/index.html
""",
                    attachmentsPattern: "${env.ALLURE_REPORT}/**"
                )
            }
        }

        unstable {
            script {
                emailext(
                    to: 'testautomationmail2025@gmail.com,worksheets.kothai@gmail.com',
                    cc: 'poongothai.ece@gmail.com',
                    subject: "Playwright Tests Unstable - Build #${env.BUILD_NUMBER}",
                    body: """Playwright test execution is UNSTABLE.

${env.TEST_SUMMARY}

Check Allure report: ${env.BUILD_URL}artifact/${env.ALLURE_REPORT}/index.html
""",
                    attachmentsPattern: "${env.ALLURE_REPORT}/**"
                )
            }
        }

        failure {
            script {
                emailext(
                    to: 'testautomationmail2025@gmail.com,worksheets.kothai@gmail.com',
                    cc: 'poongothai.ece@gmail.com',
                    subject: "Playwright Tests Failed - Build #${env.BUILD_NUMBER}",
                    body: """Playwright test execution failed.

${env.TEST_SUMMARY}

Check Allure report: ${env.BUILD_URL}artifact/${env.ALLURE_REPORT}/index.html
""",
                    attachmentsPattern: "${env.ALLURE_REPORT}/**"
                )
            }
        }
    }
}