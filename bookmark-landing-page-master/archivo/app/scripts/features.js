
let scrollItems = document.querySelectorAll('.features__scroll-item');


scrollItems.forEach(item => {
    item.addEventListener('click', (e)=>{
        console.log(e.target);
        if(e.target.classList.contains('scroll-0')){
            showItem(0);
        }
        else{
            if(e.target.classList.contains('scroll-1')){
                showItem(1);
            }
            else{
                if(e.target.classList.contains('scroll-2')){
                    showItem(2);
                }
            }
        }
    })
});

function showItem(index){
    let items = document.querySelectorAll('.features__item');

    for (let i=0; i<items.length; i++){
        if(!items[i].classList.contains('hidden')){
            items[i].classList.add('hidden');
        }
        scrollItems[i].classList.remove('selected');
    }
    
    items[index].classList.remove('hidden');
    scrollItems[index].classList.add('selected');
}   

