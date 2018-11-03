
import { IO } from "funfix-effect"
import { doSomeStuff } from "@lostintime/funfix-issue-client"

const two = IO.unit()

doSomeStuff()
  .flatMap(_ => two)
  .runOnComplete(() => {
    console.log("done")
  })