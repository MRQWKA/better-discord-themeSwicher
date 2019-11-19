//META{"name":"ThemeSwicher"}*//
var fs = require('fs');
var themes = [];
var currentTheme = 0;
var themesFolderPath;
class ThemeSwicher{
    getName () {return "Theme Swicher";}

    getVersion () {return "1.0.0";}

    getAuthor () {return "PatPatoPat";}

    getDescription () {return "uwu";}


    start () {
        $(document).off("keyup");
        this.initZlib();
        themesFolderPath = ZLibrary.PluginUtilities.getThemesFolder();
        this.getThemes(themesFolderPath);
        this.setTheme(currentTheme);
        $(document).on("keyup",(key) => this.onKey(key));
    }

    onKey (key){
        if(key == null){return true;}
        if(key.altKey&&key.ctrlKey&&key.key == "T"){
            this.swichTheme();
        }
    }

    swichTheme(){
        console.log("ThemeSwicher: Theme swich");
        console.log(currentTheme);
        currentTheme++;
        if(currentTheme>themes.length){
            currentTheme = 0;
        }
        this.setTheme();
    }
    
    initZlib() {
        if (typeof window.ZeresPluginLibrary === "undefined") {
            BdApi.showToast('AutoStartRichPresence: Please install "ZeresPluginLibrary" and restart this plugin.', {type: "error"});
        }
        ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "LINK_TO_RAW_CODE");
    }

    getThemes (path) {
        if(path == null){
            return false;
        }
        fs.readdir(themesFolderPath, (err, files) => {
            for(var i = 0;i < files.length;i++){
                themes[i] = fs.readFileSync(themesFolderPath+"/"+files[i],'utf8');
            }
        });
    }

    updateSettings () {

    }

    load () {
        this.setTheme(currentTheme);
        $(document).off("keyup");
    }
    setTheme () {
        BdApi.clearCSS("body");
        BdApi.injectCSS("body",themes[currentTheme]);
    }

    stop () {
        BdApi.clearCSS("body");
        $(document).off("keyup");
    }
}