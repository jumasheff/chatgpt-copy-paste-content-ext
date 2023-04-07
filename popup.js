document.addEventListener("DOMContentLoaded", function () {
	var initialPromptBtn = document.getElementById("initialPromptBtn");
	initialPromptBtn.addEventListener("click", pasteInitialPrompt);

	var pasteNextArticleBtn = document.getElementById("pasteBtn");
	pasteNextArticleBtn.addEventListener("click", pasteNextArticle);
});

function pasteInitialPrompt() {
	let params = {
		active: true,
		currentWindow: true,
	};
	chrome.tabs.query(params, gotTabs);

	function gotTabs(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { action: "initial" });
	}
}

function pasteNextArticle() {
	let params = {
		active: true,
		currentWindow: true,
	};
	chrome.tabs.query(params, gotTabs);

	function gotTabs(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { action: "paste" });
	}
}
