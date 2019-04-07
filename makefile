setup:
	mkdir logs screenshots storage playground
cleanlogs:
	rm logs/*
cleanscreenshots:
	rm screenshots/*
cleanall:
	make cleanlogs
	make cleanscreenshots
newstorage:
	cp storage/out.csv.bak storage/out.csv