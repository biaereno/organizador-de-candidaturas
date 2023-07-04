document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const formData = {
      nomevaga: form.nomevaga.value,
      plat: form.plat.value,
      tag1: form.tag1.checked ? 'PJ' : '',
      tag2: form.tag2.checked ? 'CLT' : '',
      tag3: form.tag3.checked ? 'Remoto' : '',
      tag4: form.tag4.checked ? 'Presencial' : '',
      tag5: form.tag5.checked ? 'Hibrido' : '',
      obs: form.obs.value
    };
  
    try {
      await fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      form.reset();
      alert('As informações foram enviadas com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao enviar as informações.');
    }
  });
  