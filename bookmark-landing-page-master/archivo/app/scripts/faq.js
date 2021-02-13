let faqs = document.querySelectorAll('.faq__label');

faqs.forEach(faq => {
    
    faq.addEventListener('click', ()=>{
        let faqParent = faq.parentElement;
        if (faqParent.classList.contains('open')) faqParent.classList.remove('open')
        else {
            closeFaqs();
            faqParent.classList.add('open')
        }
    })
});

function closeFaqs(){
    faqs.forEach(faq => {
        let faqParent = faq.parentElement;
        if (faqParent.classList.contains('open')) faqParent.classList.remove('open');
    });
}