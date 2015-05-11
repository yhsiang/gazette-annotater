deploy ::
	git co gh-pages
	git merge master --no-edit
	npm run build
	git add build
	git commit -m "deploy"
	git push origin gh-pages:gh-pages
	git co master
