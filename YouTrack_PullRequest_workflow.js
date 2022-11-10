const entities= require('@jetbrains/youtrack-scripting-api/entities');
exports.rule= entities.Issue.onChange({
  title: 'Pull Request',
  guard: (ctx) => {
      return ctx.issue.pullRequests.added.isNotEmpty() &&
      (ctx.issue.pullRequests.added.last().state.name === "OPEN" ||
      ctx.issue.pullRequests.added.last().state.name !== ctx.issue.pullRequests.added.last().previousState.name);
  },
  action: (ctx) => {
    switch(ctx.issue.pullRequests.added.last().state.name){
      case "OPEN":
        if(ctx.issue.pullRequests.added.last().branch !== "master"){
        	ctx.issue.fields.Stage= ctx.Stage.Review;
        	ctx.issue.addComment("The issue is ready to be reviewed");
        }else{
          ctx.issue.addComment("The issue is ready to be resolved");
        }
        break;
      case "DECLINED":
        ctx.issue.fields.Stage= ctx.Stage.Develop;
        ctx.issue.addComment("The issue is not ready, back to developing");
        break;
      case "MERGED":
        if(ctx.issue.pullRequests.added.last().branch !== "master"){
          ctx.issue.fields.Stage= ctx.Stage.Test;
          ctx.issue.addComment("The issue is ready to be tested");
        }else{
          ctx.issue.fields.Stage= ctx.Stage.Done;
          ctx.issue.addComment("The issue is resolved, gj!");
        }
        break;
	}
  },
  requirements: {
    Stage: {
      type: entities.State.fieldType,
      Backlog: {},
      Develop: {},
      Review: {},
      Test: {},
      Done: {}
    }
  }
});
