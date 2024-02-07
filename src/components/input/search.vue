<template>
  <div class="container-all">
    <h1 class="text-center">Search</h1>

    <div class="container">
      <section>
        <div class="row">
          <div class="half">
            <div class="input-group">
              <label>From</label>

              <input
                type="text"
                :value="from"
                @input="$emit('update:from', $event.target.value)"
                placeholder="Enter User Folder name"
              />
            </div>
          </div>
          <div class="half">
            <div class="input-group">
              <label>To</label>
              <input
                type="text"
                :value="to"
                @input="$emit('update:to', $event.target.value)"
                placeholder="Enter User Folder name"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="half">
            <div class="input-group">
              <label>Attachment</label>
              <input
                type="text"
                :value="attatchment"
                @input="$emit('update:attatchment', $event.target.value)"
                placeholder="Enter User Folder name"
              />
            </div>
          </div>
          <div class="half">
            <div class="input-group">
              <label>Has the words</label>
              <input
                type="text"
                :value="body"
                @input="$emit('update:body', $event.target.value)"
                placeholder="Enter User Folder name"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="half">
            <div class="input-group">
              <label>Subject</label>
              <input
                type="text"
                :value="subject"
                @input="$emit('update:subject', $event.target.value)"
                placeholder="Enter User Folder name"
              />
            </div>
          </div>
          <div class="half">
            <div class="input-group">
              <label>Doesn't have</label>
              <input type="text" placeholder="Enter User Folder name" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attatchment: String,
    from: String,
    to: String,
    body: String,
    subject: String,
  },
  emits: [
    "update:attatchment",
    "update:from",
    "update:to",
    "update:body",
    "update:subject",
  ],

  // props:['from'],
  // emits:["update:from"]
};
</script>

<style lang="scss" scoped>
/* Theme color */
$theme-color: rgb(52, 152, 219);

// --------------------------------------------
//	Selectbox
// --------------------------------------------

.select-wrapper {
  position: relative;
  //border: 1px solid black;

  select {
    display: none;
  }

  // --------------------------------------------
  //	Select Button - Current Selected
  // --------------------------------------------
  .select-btn {
    display: flex;
    background: white;
    text-decoration: none;
    text-align: left;
    padding: 0;
    color: #0a0808;
    width: 100%;
    border: 0;
    height: 50px;
    border: 1px solid rgba(8, 7, 7, 0.25);
    cursor: pointer;

    .label {
      white-space: nowrap;
      text-overflow: ellipsis;
      flex-grow: 1;
      display: block;
      overflow: hidden;
      margin-right: 45px;
      padding: 0 0.75rem;
      display: flex;
      align-items: center;
    }

    .caret {
      position: absolute;
      font-size: 1.25rem;
      top: 0;
      bottom: 0;
      right: 0;
      padding: 0 0.75rem;
      display: flex;
      align-items: center;
    }

    img {
      width: 25px;
      margin-right: 5px;
      vertical-align: middle;
      border-radius: 50%;

      & ~ img {
        margin-left: 5px;
      }
    }

    .icon {
      margin-right: 5px;
      vertical-align: middle;
      border-radius: 50%;
      padding: 5px;

      & ~ .icon {
        margin-left: 5px;
      }
    }
  }

  // --------------------------------------------
  //	Selectlist - Option list
  // --------------------------------------------

  .select-list {
    display: none;
    list-style: none;
    background: white;
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    z-index: 99;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-width: 0 1px 1px;

    li.search {
      height: 45px;
      display: flex;
      align-items: center;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-width: 0 0 1px 0;
      background: rgba(0, 0, 0, 0.05);

      .icon {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        padding: 0 0.75rem;
      }

      .clear {
        display: none;
        align-items: center;
        height: 100%;
        padding: 0 0.75rem;
        font-size: 1.25rem;
        cursor: pointer;
      }

      input {
        height: 100%;
        border: none;
        border-radius: 0;
        padding: 0;
        flex-grow: 1;
        background: transparent;
      }
    }

    li.no-result {
      display: none;
      height: 50px;
      line-height: 50px;
      padding: 0 0.75rem !important;
      text-align: center;
    }

    li.option {
      padding: 0 0.75rem;
      height: 50px;
      user-select: none;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      color: #000;

      img {
        width: 25px;
        margin-right: 5px;
        margin-left: -5px;
        vertical-align: middle;
        border-radius: 50%;
      }

      .icon {
        margin-right: 5px;
        vertical-align: middle;
        border-radius: 50%;
        padding: 5px;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      &[selected] {
        background: rgba(0, 0, 0, 0.1);
      }

      &[disabled] {
        opacity: 0.25;
      }

      &[placeholder] {
        display: none !important;
      }

      .check {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        padding-right: 0.75rem;
      }
    }

    li.group {
      span {
        cursor: default;
        padding: 0.75rem;
        display: block;
        user-select: none;

        & ~ li {
          padding-left: 2rem !important;
        }
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding-left: 1.5rem;
        }
      }
    }
  }
}

// --------------------------------------------
//	Presentation Layout Style
// --------------------------------------------
//
//  This is not apart of Selectbox Styling
//
// --------------------------------------------

.input-group {
  position: relative;
  margin: 1rem 0;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #080808;
  }
}

input[type="text"],
input[type="search"],
select,
textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #120e0e;
  outline: none;
  border-radius: 3px;

  &:focus {
    border-color: rgba($theme-color, 0.5);
  }
}

body {
  background: #333;
  color: #999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Lato";
  font-weight: 300;
}
h1,
h2,
h3 {
  font-weight: 300;
}

h1 {
  color: #090c0b;
}

span[text] {
  font-size: 1.1rem;
  position: relative;
  display: block;
  margin: 1rem 0 0.5rem;

  &:before {
    position: relative;
    content: attr(text);
    display: inline-block;
    background: #333;
    color: #64ffda;
    padding-right: 0.75rem;
    z-index: 1;
  }

  &:after {
    content: "";
    display: block;
    height: 1px;
    background: #64ffda;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
  }
}
sup {
  color: #64ffda;
  font-weight: 500;
  font-size: 0.75rem;
  top: -1em;
}
.container {
  width: 80%;
  max-width: 1024px;
  margin: auto;
}
.text-center {
  text-align: center;
}

.row {
  &:before,
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.half {
  width: 50%;
  float: left;
  box-sizing: border-box;
  padding: 0 15px;
}

@media screen and (max-width: 789px) {
  .half {
    width: 100%;
  }
}
</style>
