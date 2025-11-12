pipeline {
    agent any

    stages {
        // Etapa para parar tdos los servicios
        stage('Parando los servicios') {
            steps {
                script {
                    echo 'Deteniendo contenedores (Windows)...'
                    // En Windows con shell cmd, usar || exit 0 para evitar fallo si no hay contenedores
                    bat 'docker compose -p SGU-ALGR-10C down || exit 0'
                }
            }
        }

        // Elimianr las imagenes anteriores  
        stage('Borrando imagenes antiguas') {
    steps {
        script {
            echo 'Eliminando imagenes antiguas...'
            bat '''
                @echo off
                for /f "delims=" %%a in ('docker images -q server:1.0-sgu') do (
                    echo Eliminando imagen %%a
                    docker rmi -f %%a || echo Falló al eliminar %%a
                )
                exit /b 0
            '''
        }
    }
}


        // Bajar la ctualizacion mas reciente
        stage('Actualizando..') {
            steps {
                checkout scm
            }
        }

        //Levantar y despegar el proyecto
        stage('Levantando los servicios') {
            steps {
                script {
                    echo 'Levantando contenedores...'
                    bat 'docker compose up --build -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado.'
        }
        success {
            echo 'Pipeline ejecutado exitosamente.'
        }
        failure {
            echo 'Error al ejecutar el pipeline.'
        }
    }
}