import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Rdir = () => {
  const { shortUrl } = useParams();
  const [loading, setLoading] = useState(false);
  const domain = `${window.location.protocol}//${window.location.host}/`;
  useEffect(() => {
    if (shortUrl) {
      checkShortUrl(shortUrl);
    }
  }, [shortUrl]);

  const checkShortUrl = async (shortUrl) => {
    setLoading(true);
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL+'/api/verify', { 
        url: domain+shortUrl 
      },
      {
        headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
      }
      });
      console.log(response.data.status);
      if(response.data.status== 'success'){
        window.location.href = response.data.url;
      }else{
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <p>Espere un momento, lo estamos redirigiendo ...</p>
      )}
    </div>
  );
};

export default Rdir;