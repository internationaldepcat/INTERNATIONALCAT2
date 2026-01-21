// ====== Datos editables ======
// Puedes personalizar por tarjeta si quieres. Por defecto, las 3 usan los mismos datos.
const CONTACTS = [
  {
    phone: '+34600000000', // Teléfono soporte (con +)
    whatsapp: '34600000000', // WhatsApp comercial (sin +)
    email: 'xxxxxx@gmail.com',
    whatsMsg: 'Hola, me interesa información comercial'
  },
  {
    phone: '+34611111111',
    whatsapp: '34611111111',
    email: 'contacto2@example.com',
    whatsMsg: 'Hola, me interesa información comercial'
  },
  {
    phone: '+34622222222',
    whatsapp: '34622222222',
    email: 'contacto3@example.com',
    whatsMsg: 'Hola, me interesa información comercial'
  }
];

// ====== Utilidades ======
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

function bindCard(cardEl, data){
  // Números visibles
  cardEl.querySelectorAll('[data-bind="phone"]').forEach(s=> s.textContent = pretty(data.phone));
  cardEl.querySelectorAll('[data-bind="whatsapp"]').forEach(s=> s.textContent = pretty('+'+data.whatsapp));
  cardEl.querySelectorAll('[data-bind="email"]').forEach(s=> s.textContent = data.email.toUpperCase());
  cardEl.querySelectorAll('[data-bind="emailHref"]').forEach(a=> a.href = `mailto:${data.email}`);

  // Botones
  cardEl.querySelectorAll('[data-action="call"]').forEach(btn => btn.onclick = () => window.location.href = `tel:${data.phone}`);
  cardEl.querySelectorAll('[data-action="whatsapp"]').forEach(btn => btn.onclick = () => {
    const url = `https://wa.me/${data.whatsapp}?text=${encodeURIComponent(data.whatsMsg)}`;
    window.open(url, '_blank', 'noopener');
  });
}

function pretty(num){
  // Formateo básico para ES (+34) si aplica
  if(num.startsWith('+34') && num.length >= 12){
    const raw = num.slice(3).replace(/\D/g,'');
    if(raw.length === 9){
      return '+34 ' + raw.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    }
  }
  return num;
}

// ====== Inicio ======
document.addEventListener('DOMContentLoaded', () => {
  // Rellena año footer
  $('#year').textContent = new Date().getFullYear();

  // Vincula las 3 primeras tarjetas
  const cards = $$('.card.card-green').slice(0,3);
  cards.forEach((card, i) => bindCard(card, CONTACTS[i] || CONTACTS[0]));
});
