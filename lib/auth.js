module.exports= {
    isOwner : function(request, response){
        if(request.session.is_logined){
            return true;
        }else{
            return false;
        }
    },
    statusUI: function(request, response){
        var authStatusUI = '<a href="/auth/login">login</a>'
        if(this.isOwner(request, response)){
            authStatusUI = `<span>${request.session.nickname}</span> | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
}