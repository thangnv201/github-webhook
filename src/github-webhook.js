import { webTrigger, storage } from "@forge/api";

export async function listener(req) {
    try {
      const body = JSON.parse(req.body);
      if(body.commits.length >0){
        const branch = body.ref.split("/")[2];
        const commit = body.commits[0];




        
        const repo = body.repository.full_name;
        const url = body.html_url;
        const data = {
            branch:branch,
            commit: commit,
            repository: repo,
            url: url,
        }
        let list_commit = await storage.get('github-commit');
        console.log(list_commit);
        if(list_commit === undefined) list_commit = [];
        list_commit.push(data);
        await storage.set('github-commit', list_commit);
      }
      
      return {
        body: "Success: Message updated\n",
        headers: { "Content-Type": ["application/json"] },
        statusCode: 200,
        statusText: "OK",
      };
    } catch (error) {
        console.log(error);
      return {
        body: error + "\n",
        headers: { "Content-Type": ["application/json"] },
        statusCode: 400,
        statusText: "Bad Request",
      }
    }
  }