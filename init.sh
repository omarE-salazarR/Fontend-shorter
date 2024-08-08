#!/bin/bash

# Función para mostrar el uso
uso() {
    echo "Uso: $0 {development|production|test}"
    exit 1
}

# Mostrar mensaje de requisitos previos
echo "Antes de ejecutar este script, asegúrate de que tu servidor backend esté configurado y en funcionamiento."
echo "Este script te permitirá configurar los archivos de entorno según el ambiente que elijas."

# Preguntar al usuario qué ambiente desea configurar
echo "Selecciona el ambiente a configurar:"
echo "1. Desarrollo (development)"
echo "2. Producción (production)"
echo "3. Pruebas (test)"
read -p "Introduce el número correspondiente (1/2/3): " OPCION

# Establecer el entorno basado en la opción seleccionada
case $OPCION in
    1)
        AMBIENTE="development"
        ;;
    2)
        AMBIENTE="production"
        ;;
    3)
        AMBIENTE="test"
        ;;
    *)
        echo "Opción inválida. Exiting setup."
        exit 1
        ;;
esac

echo "Configurando el entorno para $AMBIENTE..."

# Ejecutar setup.sh con el entorno seleccionado
if [ -f setup.sh ]; then
    ./setup.sh "$AMBIENTE"
else
    echo "¡No se encontró setup.sh!"
    exit 1
fi

echo "¡Configuración completa!"
