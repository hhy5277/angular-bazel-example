# The WORKSPACE file tells Bazel that this directory is a "workspace", which is like a project root.
# The content of this file specifies all the external dependencies Bazel needs to perform a build.

####################################
# ESModule imports (and TypeScript imports) can be absolute starting with the workspace name.
# The name of the workspace should match the npm package where we publish, so that these
# imports also make sense when referencing the published package.
workspace(name = "angular_bazel_example")

# This rule is built-into Bazel but we need to load it first to download more rules
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "build_bazel_rules_nodejs",
    strip_prefix = "rules_nodejs-0.16.8",
    url = "https://github.com/bazelbuild/rules_nodejs/archive/0.16.8.zip",
)

# The @angular repo contains rule for building Angular applications
http_archive(
    name = "angular",
    strip_prefix = "angular-8.0.0-beta.3",
    url = "https://github.com/angular/angular/archive/8.0.0-beta.3.zip",
)

# The @rxjs repo contains targets for building rxjs with bazel
http_archive(
    name = "rxjs",
    sha256 = "72b0b4e517f43358f554c125e40e39f67688cd2738a8998b4a266981ed32f403",
    strip_prefix = "package/src",
    url = "https://registry.yarnpkg.com/rxjs/-/rxjs-6.3.3.tgz",
)

# Angular material
http_archive(
    name = "angular_material",
    strip_prefix = "material2-7.3.1",
    url = "https://github.com/angular/material2/archive/7.3.1.zip",
)

# Rules for compiling sass
http_archive(
    name = "io_bazel_rules_sass",
    sha256 = "76ae498b9a96fa029f026f8358ed44b93c934dde4691a798cb3a4137c307b7dc",
    strip_prefix = "rules_sass-1.15.1",
    url = "https://github.com/bazelbuild/rules_sass/archive/1.15.1.zip",
)

####################################
# Load and install our dependencies downloaded above.

load("@build_bazel_rules_nodejs//:defs.bzl", "check_bazel_version", "node_repositories", "yarn_install")

# The minimum bazel version to use with this example repo, for those who use a global-installed Bazel
# Bazel version must be at least v0.21.0 because:
#            (see https://github.com/angular/angular/issues/27514#issuecomment-451438271)
check_bazel_version(minimum_bazel_version = "0.21.0")

node_repositories(
    node_version = "10.9.0",
    yarn_version = "1.12.1",
)

yarn_install(
    name = "npm",
    data = [
        "//:postinstall.tsconfig.json",
        # Need a reference to @angular here so that Bazel sets up the
        # external repository before calling yarn_install
        "@angular//:LICENSE",
    ],
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

# Install all bazel dependencies of the npm packages
load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

# Fetch karma dependencies (rules_webtesting)
load("@build_bazel_rules_karma//:package.bzl", "rules_karma_dependencies")

rules_karma_dependencies()

load("@io_bazel_rules_webtesting//web:repositories.bzl", "browser_repositories", "web_test_repositories")

web_test_repositories()

browser_repositories(
    chromium = True,
    firefox = True,
)

load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")

ts_setup_workspace()

load("@io_bazel_rules_sass//:defs.bzl", "sass_repositories")

sass_repositories()

load("@angular//:index.bzl", "ng_setup_workspace")

ng_setup_workspace()

load("@angular_material//:index.bzl", "angular_material_setup_workspace")

angular_material_setup_workspace()
