var initialPromptURL = "https://dummyjson.com/products/1";
var nextPromptURL = "https://dummyjson.com/products/1";

var observer = null;
var chat = document.querySelector(".flex.flex-col.items-center.text-sm");

function startObserver() {
	chat = document.querySelector(".flex.flex-col.items-center.text-sm");
	console.log("CHAT", chat);
	if (chat) {
		observer = new MutationObserver(function (mutationsList) {
			for (var mutation of mutationsList) {
				if (
					mutation.type === "childList" &&
					mutation.addedNodes.length > 0
				) {
					console.log("ADDED NODES", mutation.addedNodes);
					addCopy();
				}
			}
		});
		observer.observe(chat, { childList: true, subtree: true });
	} else {
		console.log("Restarting!");
		setTimeout(startObserver, 500);
	}
}

function addCopy() {
	var divs = document.getElementsByClassName(
		"group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50"
	);

	for (var i = 0; i < divs.length; i++) {
		if (divs[i]?.lastChild?.innerHTML === "Copy") {
			continue;
		}
		var button = document.createElement("button");
		button.innerText = "Copy";
		button.addEventListener("click", function () {
			var text = this.parentNode.innerText.trim();
			navigator.clipboard.writeText(text);
		});
		console.log("ADDING BUTTON!");

		observer.disconnect();
		divs[i].appendChild(button);
		observer.observe(chat, { childList: true, subtree: true });
	}
}

startObserver();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "initial") {
		fetch(initialPromptURL)
			.then((res) => res.json())
			.then((json) => {
				var { category } = json || "Some text";
				var input = document.querySelector(
					"[placeholder='Send a message...']"
				);
				input.innerHTML = category;
			});
	} else if (request.action == "paste") {
		fetch(nextPromptURL)
			.then((res) => res.json())
			.then((json) => {
				var { description } = json || "Some text";
				var input = document.querySelector(
					"[placeholder='Send a message...']"
				);
				input.innerHTML = description;
			});
	}
});
