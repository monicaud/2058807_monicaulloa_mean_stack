var blogs = [];

class Blog{
    constructor(title, article, image){
        this.title = title;
        this.article = article ;
        this.image = image;
    }
}

function validate(){
    let title = document.getElementById("title").value;
    let article = document.getElementById("article").value;
    let image = document.getElementById("image").value;
    if(title.length == 0){
        alert("Need title before adding.");
        return false;
    }
    else if(article.length == 0){
        alert("Need article before adding.");
        return false;
    }
    else if (image.length == 0){
       alert("Need image before adding.");
       return false;
    }
    else{
        return true;
    }
}

function addBlog(){
    if(validate()){
        console.log("hello");
        let title = document.getElementById("title").value;
        if(title.length > 30){
            title = "<div class = \"art-title\"><b>"+title.substring(0,30) + "... </b></div>";
        }
        else{
            title = "<div class = \"art-title\"><b>"+title + "</b></div>";
        }
    
    
        let article = document.getElementById("article").value;
        if(article.length > 60){
            article = "<p>"+ article.substring(0,60) + "...</p>" ;
        }
        else{
            article="<p>"+ article + "</p>" ;
        }
        
        let image = "<img src=\""+document.getElementById("image").value + "\" class=\"img-thumbnail\">";
        let rowbegin = "<div class=\"row pic-row\">";
        let rowend = "</div>";
        let colbegin = "<div class=\"col-4 pic-col\"><div class=\"column-content\">";
        let colend = "</div></div>";
    
        let beginningcontent = "";
        let endcontent = "";
        let content = "";
    
        let blog = new Blog(title, article, image);
        blogs.push(blog);
        let midcontent = "";
    
        for(let i = 0 ; i < blogs.length; i++){
            if(i%3 == 0){
                if(blogs.length >=3){
                    beginningcontent = rowend + rowbegin + colbegin;
                    //row end
                    //row begin
                    //col begin
                }
                else{
                    beginningcontent = rowbegin + colbegin;
                    //row begin
                    //col begin
                    
                }
                //add content
                //col end
                endcontent = colend;
                midcontent = blogs[i].title + blogs[i].article + blogs[i].image;
                content += beginningcontent + midcontent + endcontent + "\n";
            }
            else{
                //col begin
                //add content
                //col end
                beginningcontent = colbegin;
                midcontent = blogs[i].title + blogs[i].article + blogs[i].image;
                endcontent = colend;
                content += beginningcontent + midcontent + endcontent + "\n";
            }
        }
        content += rowend;
        console.log(content);
        document.getElementById("maincontent").innerHTML = content;
    }
}