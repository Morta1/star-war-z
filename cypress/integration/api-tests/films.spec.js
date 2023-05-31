describe('TODO api testing', () => {
  it('GET - fetch all films', () => {
    cy.request('/films').as('filmsRequest');
    cy.get('@filmsRequest').then(films => {
      expect(films.status).to.eq(200);
      assert.isArray(films.body.data, 'Films response is an array')
      assert.lengthOf(films.body.data, 6, 'with length of 6')
    });
  });

  it('GET - fetch films filtered with title (return one result)', () => {
    cy.request('/films?title=empire').as('filmsRequest');
    cy.get('@filmsRequest').then(films => {
      expect(films.status).to.eq(200);
      const film = films.body.data.at(0);
      assert.isArray(film.characters, 'Has characters array')
      assert.exists(film.id);
    });
  });

  it('GET - fetch specific film with expand ', () => {
    cy.request('/films/1?expand=characters,planets').as('filmsRequest');
    cy.get('@filmsRequest').then(film => {
      expect(film.status).to.eq(200);
      assert.isObject(film.body.data, 'Film is an object');
      assert.isArray(film.body.data.characters, 'Has characters array')
      assert.isArray(film.body.data.planets, 'Has planets array')
    });
  });

  it('GET - fetch specific film with wrong expand value', () => {
    cy.request('/films/1?expand=ch').as('filmsRequest');
    cy.get('@filmsRequest').then(film => {
      expect(film.status).to.eq(200);
      assert.isObject(film.body.data, 'Film is an object');
      assert.notExists(film.body.ch)
    });
  });

  it('GET - fail on NaN ID', () => {
    cy.request({ url: '/films/abc', failOnStatusCode: false }).as('filmsRequest');
    cy.get('@filmsRequest').then(films => {
      expect(films.status).to.eq(400);
    });
  });

  it('POST - fail with wrong http method', () => {
    cy.request({ url: '/films', method: 'POST', failOnStatusCode: false }).as('filmsRequest');
    cy.get('@filmsRequest').then(films => {
      expect(films.status).to.eq(405);
    });
  });

  it('POST - fail with non existing route', () => {
    cy.request({ url: '/', failOnStatusCode: false }).as('filmsRequest');
    cy.get('@filmsRequest').then(films => {
      expect(films.status).to.eq(404);
    });
  });
});