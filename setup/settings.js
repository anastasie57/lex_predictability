var Experigen =  {
	settings: {

		experimentName: "faiermaximovapredicttest", // use only A-Z, a-z, 0-9
		
		databaseServer: "https://sdb.phonologist.org/experigen57/",

		online: true, // make sure you know what you're doing before changing this
		
		strings: {
			windowTitle:     "Угадывание слов",
			connecting:		 "Подключение...",
			loading:         "Загрузка...",
			soundButton:     "    ►    ",
			continueButton:  "   Далее   ",
			errorMessage:    "Ошибка",
			emptyBoxMessage: "Пожалуйста, заполните свой ответ в текстовое поле"
		},
		
		audio: true,
		
		progressbar: {
			visible: true, 
			adjustWidth: 4,
			percentage: false
		},
		
		items: "resources/items.txt",
		
		otherresources: {
			frames: "resources/frames.txt",
			pictures: "resources/pictures.txt"	
		},

		folders: {
			views: "views/",
			sounds: "resources/sounds/",
			pictures: "resources/pictures/"
		},
	
		footer: "views/footer.html",
		missingview: "views/missingview.ejs"
	}	
};


