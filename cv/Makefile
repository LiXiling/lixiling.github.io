# Builds both CV variants into build/. `make publish` copies the one-page CV
# the website links to into this folder; the academic CV stays in build/. Requires TeX Live (xelatex, latexmk).
VARIANTS := resume-sheets cv-sheets

all: $(VARIANTS:%=build/%.pdf)

# Publications come from the website.
pubs.tex: ../publications.html gen_pubs.py
	python3 gen_pubs.py

build/%.pdf: %.tex pubs.tex profile.tex content.tex cvcommon.tex style-sheets.tex
	latexmk -xelatex -interaction=nonstopmode -halt-on-error -outdir=build $<

# The committed, linked PDF. Run after any CV or publication change.
publish: all
	cp build/resume-sheets.pdf Maximilian_Xiling_Li_CV.pdf

clean:
	rm -rf build pubs.tex

.PHONY: all publish clean
