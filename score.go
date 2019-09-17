package main

import (
	"bufio"
	"fmt"
	"os"

	textrank "github.com/DavidBelicza/TextRank"
)

func main() {
	stdin := bufio.NewScanner(os.Stdin)
	rawText := ""
	for stdin.Scan() {
		rawText += stdin.Text()
	}

	tr := textrank.NewTextRank()
	rule := textrank.NewDefaultRule()
	language := textrank.NewDefaultLanguage()
	algorithmDef := textrank.NewDefaultAlgorithm()

	tr.Populate(rawText, language, rule)
	tr.Ranking(algorithmDef)

	sentences := textrank.FindSentencesByRelationWeight(tr, 10)
	for _, s := range sentences {
		fmt.Println(s.Value)
	}
}
