import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Shorter = () => {
  const [url, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const domain = `${window.location.protocol}//${window.location.host}`;
  const validateUrl = (url) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('El campo URL no puede estar vacío.');
      return;
    }
    if (!validateUrl(url)) {
      setError('Por favor, ingrese una URL válida.');
      return;
    }
    setError('');
    Swal.fire({
      title: 'Acortando URL...',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL+'/api/obtainUrl', { 
        url: url, 
        domain: domain 
        },
        {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      });
      if (response.data && response.data.short_url) {
        setShortenedUrl(response.data.short_url);
        Swal.close();
        Swal.fire({
            title: 'URL acortada',
            html: `
              <div class="input-group">
                <input type="text" class="form-control" value="${response.data.short_url}" readonly>
                <div class="input-group-append">
                  <button class="btn btn-primary" id="ir-a-url">Ir a URL</button>
                  <button class="btn btn-secondary" id="copiar-url">Copiar URL</button>
                </div>
              </div>
            `,
            showConfirmButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              const irAUrlButton = document.getElementById('ir-a-url');
              const copiarUrlButton = document.getElementById('copiar-url');
          
              irAUrlButton.addEventListener('click', () => {
                window.open(response.data.short_url, '_blank');
              });
          
              copiarUrlButton.addEventListener('click', () => {
                navigator.clipboard.writeText(response.data.short_url).then(() => {
                  Swal.fire({
                    title: 'URL copiada',
                    text: 'La URL ha sido copiada al portapapeles.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
              });
            },
          });
          
      } else {
        setError('No se recibió una URL acortada.');
        Swal.fire({
          title: 'Error',
          text: 'No se recibió una URL acortada.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      setError('Ocurrió un error al acortar la URL.');
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al acortar la URL.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Acortador de URL</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="url">URL:</label>
              <input
                type="url"
                className="form-control"
                id="url"
                value={url}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Ingrese URL"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Acortar</button>
          </form>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Shorter;