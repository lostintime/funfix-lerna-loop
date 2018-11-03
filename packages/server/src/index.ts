
import { IO } from "funfix-effect"
import { doSomeStuff } from "@lostintime/funfix-issue-client"

doSomeStuff()
  .flatMap(_ => IO.unit())
  .runOnComplete(() => {
    console.log("done")
  })