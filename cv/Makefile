# Builds the CV into build/ and, with `make publish`, copies the PDFs the
# website links to into this folder. Requires TeX Live (xelatex, latexmk).
VARIANTS := resume-sheets cv-sheets

all: $(VARIANTS:%=build/%.pdf)

# Publications come from the website.
pubs.tex: ../publications.html gen_pubs.py
	python3 gen_pubs.py

build/%.pdf: %.tex pubs.tex profile.tex content.tex cvcommon.tex style-sheets.tex
	latexmk -xelatex -interaction=nonstopmode -halt-on-error -outdir=build $<

# The committed, downloadable PDFs. Run after any CV or publication change.
publish: all
	cp build/resume-sheets.pdf Maximilian_Xiling_Li_CV.pdf
	cp build/cv-sheets.pdf Maximilian_Xiling_Li_Academic_CV.pdf

clean:
	rm -rf build pubs.tex

.PHONY: all publish clean
