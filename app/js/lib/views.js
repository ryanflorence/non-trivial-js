define(['lib/vendor/dust'],
function(dust) { (function() {
        dust.register("confirmContent", body_0);
        function body_0(chk, ctx) {
            return chk.write("<h3>Hold Up!</h3><p>Are you sure you want to delete <em class=\"confirmLabel\">").reference(ctx.get("label"), ctx, "h").write("</em>?</p><div class=\"actions\"><button class=\"cancel\">Cancel</button> <button class=\"confirm\">Destroy it!</button></div>");
        }
        return body_0;
    })(); (function() {
        dust.register("confirmWrapper", body_0);
        function body_0(chk, ctx) {
            return chk.write("<div class=\"confirmWrapper\"><div class=\"confirmInner\"><div class=\"confirmContent\"></div></div></div>");
        }
        return body_0;
    })(); (function() {
        dust.register("task", body_0);
        function body_0(chk, ctx) {
            return chk.write("<li id=\"task-").reference(ctx.getPath(false, ["props", "id"]), ctx, "h").write("\"><label><input name=\"").reference(ctx.getPath(false, ["props", "id"]), ctx, "h").write("\" type=\"checkbox\" ").reference(ctx.getPath(false, ["props", "checked"]), ctx, "h").write(">").reference(ctx.getPath(false, ["props", "name"]), ctx, "h").write("</label> <button data-id=\"").reference(ctx.getPath(false, ["props", "id"]), ctx, "h").write("\" data-label=\"").reference(ctx.getPath(false, ["props", "name"]), ctx, "h").write("\">✖</button></li>");
        }
        return body_0;
    })();
    return dust
});