async function postJSON(url, body){const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}); return r.json();}
document.querySelectorAll('form').forEach(form=>{
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if(location.pathname.endsWith('signup.html')){
      const res = await postJSON('/api/auth/signup', data);
      alert(res.message||JSON.stringify(res)); if(res.ok) location='/login.html';
    } else {
      const res = await postJSON('/api/auth/login', {...data, remember: data.remember? true:false});
      if(res.ok){ location='/chat.html' } else alert(res.message||'Login failed');
    }
  })
})
