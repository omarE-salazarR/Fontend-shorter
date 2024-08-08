#!/bin/bash

# Función para obtener el token del servicio
get_token() {
    local token_service_url="$1"
    local email="test@short.com"
    local password="password123"
    # Enviar solicitud POST con los datos necesarios
    response=$(curl -s -X POST "$token_service_url" \
        -H "Content-Type: application/json" \
        -d "{\"email\": \"$email\", \"password\": \"$password\"}")

    # Extraer el token de la respuesta JSON
    token=$(echo "$response" | grep -oP '"token":\s*"\K[^"]+')

    if [ -z "$token" ]; then
        echo ""
        exit 1
    fi
    echo "'$token'"
}

# Mensaje sobre generación de credenciales
echo "Para obtener un token de acceso, puedes usar las credenciales predefinidas."
echo "Si necesitas generar tus propias credenciales, visita el endpoint /api/register en tu backend."
echo "Consulta la documentación para más detalles sobre cómo registrarte y obtener credenciales."

# Preguntar al usuario por la URL del backend
echo "Introduce la URL de tu backend. Esta URL puede ser una IP o un dominio donde se está ejecutando tu backend."
echo "Si estás ejecutando el backend localmente, la URL generada al ejecutar 'php artisan serve' suele ser algo como http://localhost:8000."
echo "Ejemplo: http://127.0.0.1:8000 o http://mi-dominio.com"
read -p "URL del backend: " BACKEND_URL

# Concatenar '/api/login' a la URL proporcionada
TOKEN_URL="${BACKEND_URL}/api/login"

# Verificar si se proporcionó un argumento de entorno
if [ -z "$1" ]; then
    echo "No se especificó el entorno. Saliendo de la configuración."
    exit 1
fi

AMBIENTE=$1

# Instalar dependencias de npm
echo "Instalando dependencias de npm..."
npm install

# Obtener el token
TOKEN=$(get_token "$TOKEN_URL")

# Verificar si se obtuvo el token exitosamente
if [ -z "$TOKEN" ]; then
    echo "No se pudo obtener el token. Saliendo de la configuración."
    exit 1
fi

# Configurar variables de entorno
echo "Configurando variables de entorno para $AMBIENTE..."

# Crear el archivo .env adecuado basado en el entorno
case $AMBIENTE in
    development)
        ENV_FILE=".env.development"
        ;;
    production)
        ENV_FILE=".env.production"
        ;;
    test)
        ENV_FILE=".env.test"
        ;;
    *)
        echo "Entorno inválido. Saliendo de la configuración."
        exit 1
        ;;
esac

if [ ! -f "$ENV_FILE" ]; then
    echo "Creando el archivo $ENV_FILE..."
    cat <<EOT > "$ENV_FILE"
REACT_APP_API_URL=$BACKEND_URL
REACT_APP_ENV=$AMBIENTE
REACT_APP_TOKEN=$TOKEN
EOT
else
    echo "El archivo $ENV_FILE ya existe. Saltando creación."
fi

echo "Terminando..."
npm cache clean --force

echo "¡Configuración completa!"
