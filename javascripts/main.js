$(document).ready(function() {
        $.ajax({
                url: "https://api.github.com/orgs/marketlayer/repos"
        }).done(function(results) {
                if (results) {
                        var getRepos = function() {
                                if (results.length) {
                                        var repo = results[0];

                                        if (repo.name.match(/^lab-/ig) && repo.name.match(/^lab-/ig).length) {
                                                $.ajax({
                                                        url: repo.url + "/contributors"
                                                }).done(function(contributors) {
                                                        var title = document.createElement("h3"),
                                                                description = document.createElement("p"),
                                                                links = document.createElement("section"),
                                                                devider = document.createElement("hr")
                                                                svg = document.createElement("p"),
                                                                links = document.createElement("section");

                                                        links.id = "downloads";
                                                        links.className = "clearfix";

                                                        title.appendChild(document.createTextNode(repo.name.replace(/^lab-/ig, "")));
                                                        description.appendChild(document.createTextNode(repo.description));

                                                        svg.innerHTML = '<div class="svg"><svg version="1.1" width="32" height="32" viewBox="0 0 16 16" class="octicon octicon-eye" aria-hidden="true"><use xlink:href="#eye" /></svg><div>' + intSeperator(repo.watchers_count) + '</div></div><div style="width: 10%;min-width: 100px;flex: 0 0 auto;box-sizing:border-box;padding:1em;text-align:center;float: left"><svg version="1.1" width="20" height="32" viewBox="0 0 10 16" class="octicon octicon-repo-forked" aria-hidden="true"><use xlink:href="#repo-forked" /></svg><div>' + intSeperator(repo.forks_count) + '</div></div><div class="svg"><svg version="1.1" width="32" height="32" viewBox="0 0 16 16" class="octicon octicon-bug" aria-hidden="true"><use xlink:href="#bug" /></svg><div>' + intSeperator(repo.open_issues_count) + '</div></div><div class="svg"><svg version="1.1" width="28" height="32" viewBox="0 0 14 16" class="octicon octicon-star" aria-hidden="true"><use xlink:href="#star" /></svg><div>' + intSeperator(repo.stargazers_count) + '</div></div><div class="svg"><svg version="1.1" width="24" height="32" viewBox="0 0 12 16" class="octicon octicon-person" aria-hidden="true"><use xlink:href="#person" /></svg><div>' + intSeperator(contributors.length) + '</div></div><div class="svg"><a href="' + repo.html_url + '" class="buttons" target="_BLANK"><svg version="1.1" width="24" height="32" viewBox="0 0 12 16" class="octicon octicon-link-external" aria-hidden="true"><use xlink:href="#link-external" /></svg><div><strong>Demo</strong></div></a></div><div class="clearfix"></div>';

                                                        links.innerHTML = '<a href="'+ repo.html_url +'/zipball/master" id="download-zip" class="button"><span>Download .zip</span></a><a href="'+ repo.html_url +'/tarball/master" id="download-tar-gz" class="button"><span>Download .tar.gz</span></a><a href="'+ repo.html_url +'" id="view-on-github" class="button" target="_BLANK"><span>View on GitHub</span></a>';

                                                        document.getElementById("main_content").appendChild(title);
                                                        document.getElementById("main_content").appendChild(description);
                                                        document.getElementById("main_content").appendChild(svg);
                                                        document.getElementById("main_content").appendChild(links);

                                                        results.splice(0, 1);

                                                        if (results.length > 1) document.getElementById("main_content").appendChild(devider);
                                                        getRepos();
                                                });
                                        } else {
                                                results.splice(0, 1);
                                                getRepos();
                                        }
                                }
                        };

                        getRepos();
                }

        });
});

function intSeperator(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
