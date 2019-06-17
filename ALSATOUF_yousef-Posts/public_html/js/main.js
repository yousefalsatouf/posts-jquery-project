$(function()
{
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts/',
        type: 'GET',
        dataType: 'json',
        success: function(posts)
        {
            const nbrPosts = posts.length / 10;
            let linksList = 'Page: ';
            
            for (let i=1; i<=nbrPosts; i++)
            {
                linksList += '<button><a class="page-target">'+i+'</a></button>';
            }
            $('#content').after(linksList);
            $('.page-target').on('click', function()
            {
                $('#content > *').remove();
                
                let postsPage = this.innerHTML * 10;
                for (let i=(postsPage-10); i<postsPage;i++)
                {
                    let postId = posts[i].id;
                    let title = posts[i].title;
                    let body = posts[i].body;
                    
                    $('#content').append('<article id="post-'+postId+'">'+
                                         '<div class="id-'+postId+'"><span>'+postId+'</span></div>'+
                                         '<div class="title-'+postId+'"><h1>'+title+'</h1></div>'+
                                         '<div class="body-'+postId+'"><p>'+body+'</p></div>'+
                                         '<button id="comment-'+postId+'" class="comment">read comments</button>'+
                                         '</article>');
                    console.log(postId);
                }
            });
        },
        error:function()
        {
            console.log('error ajax');
        }
    });
    
    $('#content').on('click', '.comment', function()
    {
        let commentId = this.id;
        let parentId = $(this).parent().attr('id');
        let postId = commentId.substring(8);
        console.log(postId);
        $.get(
            'http://jsonplaceholder.typicode.com/comments?postId='+postId,
            function(comments)
            {
             $.each(comments, function(index, value)
                {
                    $('#' + parentId).append(
                         '<div class="comments">'+
                         '<p><b>Email: </b>'+value.email+'</p>'+
                         '<p><b>Name: </b>'+value.name+'</p>'+
                         '<p><b>Comment: </b>'+value.body+'</p>'+
                         '</div>'   
                         );
                });   
            });
    });
});