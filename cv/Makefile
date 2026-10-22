# Builds all CV variants into build/. Requires TeX Live (lualatex, latexmk).
VARIANTS := resume-sheets cv-sheets

all: pubs.tex $(VARIANTS:%=build/%.pdf)

# Publications come from the website.
pubs.tex: ../publications.html gen_pubs.py
	python3 gen_pubs.py

build/%.pdf: %.tex pubs.tex profile.tex content.tex cvcommon.tex style-sheets.tex
	latexmk -xelatex -interaction=nonstopmode -halt-on-error -outdir=build $<

clean:
	rm -rf build

.PHONY: all clean
