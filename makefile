setup:
	mkdir logs screenshots storage
cleanlogs:
	rm logs/*
newstorage:
	cp storage/out.csv.bak storage/out.csv