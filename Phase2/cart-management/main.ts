class Item{
    constructor(public name:string, public price:number, public url:string, public quantity:number){}
}

let items:Item[] = [];
let carttotal:number = 0;

function mainOnLoad(){
    //hard coded items
    let item1 = new Item("eggs", 2,"https://cdn.pixabay.com/photo/2018/02/26/16/30/eggs-3183410_960_720.jpg",0);
    let item2 = new Item("milk", 3,"http://s3-wp-lyleprintingandp.netdna-ssl.com/wp-content/uploads/2020/02/24142716/N1901P60038H-e1582572477914.jpg",0);
    let item3 = new Item("bread", 3,"https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B0%2C0%5D&w=1753&h=877&url=https%3A%2F%2Fassets.marthastewart.com%2Fd27%2Fhomemade_white_bread_how-to%2Fhomemade_white_bread_how-to_horiz.jpg",0);
    let item4 = new Item("cheese", 1,"https://cdn.cnn.com/cnnnext/dam/assets/200623110902-cheddar-cubes-full-169.jpg",0);
    
    let imgSrc = "";
    
    
    items.push(item1);
    items.push(item2);
    items.push(item3);
    items.push(item4);
    if(localStorage.getItem("carttotal")){
        console.log("local storage carttotal exists");
        carttotal = parseInt(localStorage.getItem("carttotal"));
        let cartDiv = <HTMLSpanElement>document.getElementById('cart');
        if(cartDiv){
            cartDiv.innerHTML = "(" + carttotal +")";
        }
    }else{
        localStorage.setItem("carttotal", "0");
        let cartDiv = <HTMLSpanElement>document.getElementById('cart');
        if(cartDiv){
            cartDiv.innerHTML = "(" + carttotal +")";
        }
    }

    let beginContent:string = "<div class=\"row\">";
    let midContent:string = "";
    let cardStart = "<div class = \"card\">"
    let cartStart2 = " <div class = \"card-body\">";
    let cardEnd = "</div></div>"
    
    
    for(let i in items){
        imgSrc = items[i].url;
        let imgStr = "<img src=\"" + imgSrc +"\" class = \"card-img-top\">";
        let buttonStr = "<input class=\"addCart\" type=\"Button\" value=\"Add To Cart\" onClick=\"addToCart("+i +")\">";
        let quantityInput = "<input class = \"addCart quantityCart\"type= \"number\" min= \"1\" value=\"1\" id = \"quantity" + i + "\" size=\"4\">";
        
        midContent += "<div class=\"col-3\">" + cardStart + imgStr + cartStart2+"<h5 class = \"card-title\">" 
        +items[i].name +"</h5>"
        +"<p class = \"card-text\">$" 
        + items[i].price
        + "</p>"
        +buttonStr
        + quantityInput+cardEnd+"</div>"; //end col
 
        
    }
    
    let tableContent = beginContent + midContent + "</div>";
    let table= <HTMLDivElement>document.getElementById('table-content');
    
    if(table){
        table.innerHTML = tableContent;
    }
}

function addToCart(id:number):void{
    
    let amount = 0;
    let quantityElement = <HTMLInputElement>document.getElementById("quantity" + id);
    let oldQuantity = 0;
    if(quantityElement){
        
        amount = parseInt(quantityElement.value) ;
        console.log("amount" + amount);
    }

    if(localStorage.getItem(id.toString())){
        //item exists in local storage 
        let newObj = JSON.parse(localStorage.getItem(id.toString()));
        newObj.quantity += amount;
        localStorage.setItem(id.toString(), JSON.stringify(newObj));
    }
    else{
        //does not exist in local storage so we set it up again
        let newObj = items[id];
        newObj.quantity = amount;
        localStorage.setItem(id.toString(),JSON.stringify(newObj));
    }
   
     
    carttotal += amount;
    localStorage.setItem("carttotal", carttotal.toString());
    let cartDiv = <HTMLSpanElement>document.getElementById('cart');
    if(cartDiv){
        cartDiv.innerHTML = "(" + carttotal +")";
    }
}

function clearCart(){
    
    localStorage.clear();
    localStorage.setItem("carttotal","0");
    carttotal = 0;
    if(localStorage.length ==0){
        console.log("CLEARED");
    }
    cartOnLoad();
}

function deleteFromCart(id:string){
    let minusAmount = JSON.parse(localStorage.getItem(id)).quantity;
    carttotal = parseInt(localStorage.getItem("carttotal"));
    carttotal -= minusAmount;
    localStorage.setItem("carttotal", carttotal+"");
    console.log("We want to delete " + localStorage.getItem(id));
    localStorage.removeItem(id);
    console.log("Deleted!");
    cartOnLoad();
}

function cartOnLoad():void{
   
    let tableBegin = "<table class=\"table\">";
    let tableEnd = "</table>"
    let tableHeader = "<thead><tr><th>Item Name</th><th>Item Price</th><th>Quantity</th><th></th></tr></thead>";
    let bodyBegin = "<tbody>";
    let bodyEnd = "</tbody>"
    let tableContent = "";
    let rows = "";

    let tableTotal = 0;
    let tableTotalRow = "";

    let cartDiv = <HTMLDivElement>document.getElementById("myCartDiv");
    let itemName = "";
    let itemPrice = 0;
    let objStr = "";
    let itemQuantity = 0;
    if(cartDiv){
        for(let key in localStorage){
            if(key != "carttotal"){
                if(localStorage.getItem(key)!=null){
                    let buttonStr = "<input style=\"justify-content: flex-end;\" type=\"Button\" value=\"X\" onClick=\"deleteFromCart("+key +")\">";
                    objStr = <string>localStorage.getItem(key);
                    itemName = JSON.parse(objStr).name;
                    itemPrice = JSON.parse(objStr).price;
                    itemQuantity = JSON.parse(objStr).quantity;
                    
                     rows += "<tr>"
                        +"<td>" + itemName+ "</td>"
                        +"<td>$"+ itemPrice + " each</td>"
                        +"<td>"+itemQuantity +"</td>" + "<td>"+ buttonStr+"</td>"
                     +"</tr>";
                     tableTotal += (itemPrice * itemQuantity);
                }
            }
        }
        tableTotalRow = "<tr><td style=\"text-align: end;\" colspan=\"4\">Total: $"+tableTotal.toString() +"</td></tr>"
        tableContent = tableBegin + tableHeader + bodyBegin + rows +tableTotalRow + bodyEnd + tableEnd;
        cartDiv.innerHTML = tableContent;
    }
}
