pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Eachawy/SDG.git', branch: 'develop'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build for Production') {
            steps {
                sh 'npm run webapp:build:prod'
            }
        }
    }
}
